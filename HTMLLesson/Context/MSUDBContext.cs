using HTMLLesson.Helper;
using HTMLLesson.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace HTMLLesson.Context
{
    public class MSUDBContext : DbContext
    {
        public MSUDBContext() { }
        public MSUDBContext(DbContextOptions<MSUDBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.ConnectionString);
        }


    }
}
