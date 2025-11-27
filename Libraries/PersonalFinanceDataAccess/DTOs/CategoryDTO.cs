namespace PersonalFinanceDataAccess.DTOs
{
    public class CategoryDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
        public ICollection<SubCategoryDTO>? SubCategories { get; set; }
    }
}
