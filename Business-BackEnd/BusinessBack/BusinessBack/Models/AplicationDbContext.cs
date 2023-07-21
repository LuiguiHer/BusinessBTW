using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BusinessBack.Models
{
    public class AplicationDbContext: DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
        {

        }
        public DbSet<Business> Businesses { get; set; }

    }
}
