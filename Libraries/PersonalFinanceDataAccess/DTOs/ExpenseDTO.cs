namespace PersonalFinanceDataAccess.DTOs
{
    public class ExpenseDTO
    {
        public Guid Id { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public bool IsDeleted { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public ExpenseDTO()
        {
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
        public void Create(string? username = null)
        {
            CreatedBy = username;
            ModifiedBy = username;
        }
        public void Update(string? username = null)
        {
            ModifiedBy = username;
            ModifiedAt = DateTime.Now;
        }
        public void SoftDelete(string? username = null)
        {
            IsDeleted = true;
            ModifiedBy = username;
            ModifiedAt = DateTime.Now;
        }
        public void Restore(string? username = null)
        {
            IsDeleted = false;
            ModifiedBy = username;
            ModifiedAt = DateTime.Now;
        }
    }
}
