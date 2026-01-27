namespace Exoosis.Infrastructure.External.Bkash;

public class BkashSettings
{
    public string AppKey { get; set; } = "7px70n664p063996p7222"; // Dummy Sandbox
    public string AppSecret { get; set; } = "h8p38p0p704386p29p292p29p292p29p292"; // Dummy Sandbox
    public string Username { get; set; } = "sandboxTokenizedUser02"; // Dummy Sandbox
    public string Password { get; set; } = "sandboxTokenizedUser02@123"; // Dummy Sandbox
    public string BaseUrl { get; set; } = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
    public string CallBackUrl { get; set; } = "http://localhost:4200/checkout/callback";
}
