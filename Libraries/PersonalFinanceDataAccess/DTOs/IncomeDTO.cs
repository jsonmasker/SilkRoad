namespace PersonalFinanceDataAccess.DTOs
{
    public class IncomeDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string Source { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
    }
}
