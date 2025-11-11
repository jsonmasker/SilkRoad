namespace Common.Services.SMSServices
{
    public interface ISMSService
    {
        public Task<bool> SendSMSAsync(string phoneNumber, string message);
    }
}
