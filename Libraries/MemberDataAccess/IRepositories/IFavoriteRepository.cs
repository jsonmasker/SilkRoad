using MemberDataAccess.DTOs;

namespace MemberDataAccess.IRepositories
{
    public interface IFavoriteRepository : IGenericRepository<FavoriteDTO>
    {
        public Task<bool> CheckFavoriteProductAsync(int productId, int userId);
        public FavoriteDTO? GetFavoriteProduct(int productId, int userId);
    }
}
