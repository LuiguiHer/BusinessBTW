namespace BusinessBack.Models.Repository
{
    public interface IBusinessRepository
    {
        Task<List<Business>> GetListBusiness();
        Task<Business> GetBusiness(int id);
        Task DeleteBusiness(Business business);
        Task<Business> AddBusiness(Business business);
        Task UpdateBusiness(Business business);
    }
}
