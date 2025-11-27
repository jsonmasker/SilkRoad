using Microsoft.EntityFrameworkCore.Storage;

namespace PersonalFinanceDataAccess
{
    public interface IUnitOfWork : IDisposable
    {


        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
