using Insurance.Calculator.Services.Models;
using System.Collections.Generic;

namespace Insurance.Calculator.Services.Repositories
{
    public interface IReferenceDataRepository
    {
        IList<Occupation> GetOccupations();
        IList<OccupationRating> GetOccupationRatings();
        IList<State> GetStates();
    }
}
