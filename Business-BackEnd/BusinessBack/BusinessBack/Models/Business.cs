using System.Reflection.Metadata.Ecma335;

namespace BusinessBack.Models
{
    public class Business
    {
        public int Id { get; set; }
        public long Nit { get; set; }
        public string tradeName { get; set; }
        public string owner { get; set; }
        public long phone { get; set; }
        public string city { get; set; }
        public DateTime dateCreated { get; set; }
    }
}
