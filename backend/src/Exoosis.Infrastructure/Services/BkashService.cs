using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Exoosis.Application.DTOs.Payments;
using Exoosis.Application.Services;
using Exoosis.Infrastructure.External.Bkash;
using Microsoft.Extensions.Options;

namespace Exoosis.Infrastructure.Services;

public class BkashService : IBkashService
{
    private readonly HttpClient _httpClient;
    private readonly BkashSettings _settings;

    public BkashService(HttpClient httpClient, IOptions<BkashSettings> settings)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
    }

    public async Task<string> GetTokenAsync()
    {
        try
        {
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("username", _settings.Username);
            _httpClient.DefaultRequestHeaders.Add("password", _settings.Password);

            var request = new BkashTokenRequest
            {
                AppKey = _settings.AppKey,
                AppSecret = _settings.AppSecret
            };

            var response = await _httpClient.PostAsJsonAsync($"{_settings.BaseUrl}/token/grant", request);
            if (!response.IsSuccessStatusCode) return string.Empty;

            var result = await response.Content.ReadFromJsonAsync<BkashTokenResponse>();
            return result?.IdToken ?? string.Empty;
        }
        catch
        {
            return string.Empty;
        }
    }

    public async Task<BkashCreatePaymentResponse?> CreatePaymentAsync(decimal amount, string invoiceNumber)
    {
        try
        {
            var token = await GetTokenAsync();
            if (string.IsNullOrEmpty(token)) return null;

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", token);
            _httpClient.DefaultRequestHeaders.Add("X-App-Key", _settings.AppKey);

            var request = new BkashCreatePaymentRequest
            {
                Amount = amount.ToString("F2"),
                MerchantInvoiceNumber = invoiceNumber,
                PayerReference = "ExoosisOrder",
                CallbackURL = _settings.CallBackUrl
            };

            var response = await _httpClient.PostAsJsonAsync($"{_settings.BaseUrl}/payment/create", request);
            return await response.Content.ReadFromJsonAsync<BkashCreatePaymentResponse>();
        }
        catch
        {
            return null;
        }
    }

    public async Task<BkashExecutePaymentResponse?> ExecutePaymentAsync(string paymentId)
    {
        try
        {
            var token = await GetTokenAsync();
            if (string.IsNullOrEmpty(token)) return null;

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", token);
            _httpClient.DefaultRequestHeaders.Add("X-App-Key", _settings.AppKey);

            var request = new { paymentID = paymentId };
            var response = await _httpClient.PostAsJsonAsync($"{_settings.BaseUrl}/payment/execute", request);
            return await response.Content.ReadFromJsonAsync<BkashExecutePaymentResponse>();
        }
        catch
        {
            return null;
        }
    }
}
