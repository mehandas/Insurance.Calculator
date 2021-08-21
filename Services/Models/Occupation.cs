namespace Insurance.Calculator.Services.Models
{
    public class Occupation : Option
    {
        public Occupation()
        {
        }

        public Occupation(int id, string name, int ratingId)
        {
            Id = id;
            Name = name;
            RatingId = ratingId;
        }

        public int RatingId { get; set; }
    }
}
