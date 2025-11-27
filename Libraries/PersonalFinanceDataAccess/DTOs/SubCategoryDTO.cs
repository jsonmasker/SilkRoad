namespace PersonalFinanceDataAccess.DTOs
{
    public class SubCategoryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
        public CategoryDTO? Category { get; set; }
    }
}
