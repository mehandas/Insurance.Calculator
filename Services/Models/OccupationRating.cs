namespace Insurance.Calculator.Services.Models
{
    public class OccupationRating : Option
    {
        public OccupationRating()
        {
        }

        public OccupationRating(int id, string name, double factor)
        {
            Id = id;
            Name = name;
            Factor = factor;
        }

        public double Factor { get; set; }
    }
}
