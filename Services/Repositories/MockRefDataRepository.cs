using Insurance.Calculator.Services.Models;
using System.Collections.Generic;

namespace Insurance.Calculator.Services.Repositories
{
    public static class MockRefDataRepository
    {
        private static readonly IList<Occupation> occupations = new List<Occupation>
        {
            new Occupation { Id = 1, Name = "Cleaner", RatingId = 3 },
            new Occupation { Id = 2, Name = "Doctor", RatingId = 1 },
            new Occupation { Id = 3, Name = "Author", RatingId = 2 },
            new Occupation { Id = 4, Name = "Farmer", RatingId = 4 },
            new Occupation { Id = 5, Name = "Mechanic", RatingId = 4 },
            new Occupation { Id = 6, Name = "Florist", RatingId = 3 }
        };

        private static readonly IList<OccupationRating> occupationRatings = new List<OccupationRating>
        {
            new OccupationRating { Id = 1, Name = "Professional", Factor = 1.1 },
            new OccupationRating { Id = 2, Name = "White Collar", Factor = 1.45 },
            new OccupationRating { Id = 3, Name = "Light Manual", Factor = 1.70 },
            new OccupationRating { Id = 4, Name = "Heavy Manual", Factor = 2.1 },
        };

        private static readonly IList<State> states = new List<State>
        {
            new State { Id = 1, Name = "State 1" },
            new State { Id = 2, Name = "State 2"},
        };

        public static IList<Occupation> Occupations => occupations;
        public static IList<OccupationRating> OccupationRatings => occupationRatings;
        public static IList<State> States => states;
    }
}
