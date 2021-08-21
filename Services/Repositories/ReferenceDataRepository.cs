using Insurance.Calculator.Services.Models;
using System.Collections.Generic;

namespace Insurance.Calculator.Services.Repositories
{
    public class ReferenceDataRepository : IReferenceDataRepository
    {
        public IList<Occupation> GetOccupations()
        {
            // Call repository and return occupation list
            return MockRefDataRepository.Occupations;
        }

        public IList<OccupationRating> GetOccupationRatings()
        {
            // Call repository and return occupation rating list
            return MockRefDataRepository.OccupationRatings;
        }

        public IList<State> GetStates()
        {
            // Call repository and return state list
            return MockRefDataRepository.States;
        }
    }
}
