using Insurance.Calculator.Services.Models;
using Insurance.Calculator.Services.Repositories;

namespace Insurance.Calculator.Services.Manager
{
    public class ReferenceDataManager : IReferenceDataManager
    {
        private readonly IReferenceDataRepository _referenceDataRepository;

        public ReferenceDataManager(IReferenceDataRepository referenceDataRepository)
        {
            _referenceDataRepository = referenceDataRepository;
        }

        public ReferenceData GetReferenceData()
        {
            var refData = new ReferenceData
            {
                Occupations = _referenceDataRepository.GetOccupations(),
                OccupationRatings = _referenceDataRepository.GetOccupationRatings(),
                States = _referenceDataRepository.GetStates()
            };

            return refData;
        }
    }
}
