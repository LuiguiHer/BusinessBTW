using Microsoft.EntityFrameworkCore;

namespace BusinessBack.Models.Repository
{
    public class BusinessRepository : IBusinessRepository
    {
        private readonly AplicationDbContext _context;

        public BusinessRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Business> AddBusiness(Business business)
        {
            _context.Add(business);
            await _context.SaveChangesAsync();
            return business;
        }

        public async Task DeleteBusiness(Business business)
        {
            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();
        }

        public async Task<Business> GetBusiness(int id)
        {
            return await _context.Businesses.FindAsync(id);   
        }

        public async Task<List<Business>> GetListBusiness()
        {
            return await _context.Businesses.ToListAsync();
        }

        public async Task UpdateBusiness(Business business)
        {
            var businessItem = await _context.Businesses.FirstOrDefaultAsync(x => x.Id == business.Id);
            if (businessItem != null)
            {
                businessItem.dateCreated = DateTime.Now;
                businessItem.Nit = business.Nit;
                businessItem.tradeName = business.tradeName;
                businessItem.owner = business.owner;
                businessItem.phone = business.phone;
                businessItem.city = business.city;

                await _context.SaveChangesAsync();
            }
        }
    }
}
