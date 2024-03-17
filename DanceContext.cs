using Microsoft.EntityFrameworkCore;
using tanez.Models;

 
namespace tanez
{
    public class DanceContext : DbContext
    {

        public DanceContext(DbContextOptions<DanceContext> options) : base(options)
        {
        }

        public DbSet<Dance> Dances {get;set; }
        public DbSet<Move> Moves {get;set; }

        public DbSet<DanceEpoch> DanceEpochs {get;set; }
        public DbSet<DanceLevel> DanceLevel {get;set; }
        public DbSet<DanceType> DanceType {get;set; }

    }
}