using Insurance.Calculator.Services.Repositories;
using Shouldly;
using System.Linq;
using Xunit;

namespace UnitTests.Services.Repositories
{
    [Collection("ReferenceDataRepository")]
    public class ReferenceDataRepositoryTests
    {
        private readonly IReferenceDataRepository _referenceDataRepository;
        public ReferenceDataRepositoryTests()
        {
            _referenceDataRepository = new ReferenceDataRepository();
        }

        [Fact]
        public void GetOccupations_ShouldReturnOccupationList()
        {
            // Act
            var response = _referenceDataRepository.GetOccupations();

            // Assert
            response.Count.ShouldBe(6);
            response.First().Id.ShouldBe(1);
            response.First().Name.ShouldBe("Cleaner");
            response.First().RatingId.ShouldBe(3);
        }

        [Fact]
        public void GetOccupationRatings_ShouldReturnOccupationList()
        {
            // Act
            var response = _referenceDataRepository.GetOccupationRatings();

            // Assert
            response.Count.ShouldBe(4);
            response.First().Id.ShouldBe(1);
            response.First().Name.ShouldBe("Professional");
            response.First().Factor.ShouldBe(1.1);
        }

        [Fact]
        public void GetStates_ShouldReturnOccupationList()
        {
            // Act
            var response = _referenceDataRepository.GetStates();

            // Assert
            response.Count.ShouldBe(2);
            response.First().Id.ShouldBe(1);
            response.First().Name.ShouldBe("State 1");
        }
    }
}
