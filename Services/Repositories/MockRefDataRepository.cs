using Insurance.Calculator.Services.Models;
using System.Collections.Generic;

namespace Insurance.Calculator.Services.Repositories
{
    public static class MockRefDataRepository
    {
        private static readonly IList<Occupation> occupations = new List<Occupation>
        {
            new Occupation(1, "Cleaner", 3),
            new Occupation(2, "Doctor", 1),
            new Occupation(3, "Author", 2),
            new Occupation(4, "Farmer", 4),
            new Occupation(5, "Mechanic", 4),
            new Occupation(6, "Florist", 3)
        };

        private static readonly IList<OccupationRating> occupationRatings = new List<OccupationRating>
        {
            new OccupationRating(1, "Professional", 1.1),
            new OccupationRating(2, "White Collar", 1.45),
            new OccupationRating(3, "Light Manual", 1.70),
            new OccupationRating(4, "Heavy Manual", 2.1)
        };

        private static readonly IList<State> states = new List<State>
        {
            new State(1, "State 1"),
            new State(2, "State 2")
        };

        public static IList<Occupation> Occupations => occupations;
        public static IList<OccupationRating> OccupationRatings => occupationRatings;
        public static IList<State> States => states;
    }
}
