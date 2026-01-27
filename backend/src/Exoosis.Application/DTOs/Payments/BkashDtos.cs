using System.Text.Json.Serialization;

namespace Exoosis.Application.DTOs.Payments;

public class BkashTokenRequest
{
    [JsonPropertyName("app_key")]
    public string AppKey { get; set; } = string.Empty;
    [JsonPropertyName("app_secret")]
    public string AppSecret { get; set; } = string.Empty;
}

public class BkashTokenResponse
{
    [JsonPropertyName("id_token")]
    public string IdToken { get; set; } = string.Empty;
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; } = string.Empty;
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; } = string.Empty;
}

public class BkashCreatePaymentRequest
{
    public string Mode { get; set; } = "0011"; // Unique for tokenized checkout
    public string PayerReference { get; set; } = string.Empty;
    public string CallbackURL { get; set; } = string.Empty;
    public string Amount { get; set; } = string.Empty;
    public string Currency { get; set; } = "BDT";
    public string Intent { get; set; } = "sale";
    public string MerchantInvoiceNumber { get; set; } = string.Empty;
}

public class BkashCreatePaymentResponse
{
    public string PaymentID { get; set; } = string.Empty;
    public string BkashURL { get; set; } = string.Empty;
    public string StatusCode { get; set; } = string.Empty;
    public string StatusMessage { get; set; } = string.Empty;
}

public class BkashExecutePaymentResponse
{
    public string PaymentID { get; set; } = string.Empty;
    public string trxID { get; set; } = string.Empty;
    public string TransactionStatus { get; set; } = string.Empty;
    public string Amount { get; set; } = string.Empty;
    public string MerchantInvoiceNumber { get; set; } = string.Empty;
    public string StatusCode { get; set; } = string.Empty;
    public string StatusMessage { get; set; } = string.Empty;
}
