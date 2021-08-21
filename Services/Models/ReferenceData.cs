using System.Collections.Generic;

namespace Insurance.Calculator.Services.Models
{
    public class ReferenceData
    {
        public IList<Occupation> Occupations { get; set; }
        public IList<OccupationRating> OccupationRatings { get; set; }
        public IList<State> States { get; set; }
    }
}
