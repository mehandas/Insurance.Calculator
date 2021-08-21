using Insurance.Calculator.Services.Manager;
using Insurance.Calculator.Services.Models;
using Insurance.Calculator.Services.Repositories;
using NSubstitute;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Insurance.Calculator.UnitTests.Services.Manager
{
    [Collection("ReferenceDataManager")]
    public class ReferenceDataManagerTests
    {
        private readonly IReferenceDataManager _referenceDataManager;
        private readonly IReferenceDataRepository _referenceDataRepository;

        private readonly IList<Occupation> MockOccupations = new List<Occupation>
        {
            new Occupation(1, "test occupation", 1)
        };
        private readonly IList<OccupationRating> MockOccupationRatings = new List<OccupationRating>
        {
            new OccupationRating(1, "test occupation rating", 1)
        };
        private readonly IList<State> MockStates = new List<State>
        {
            new State(1, "test state")
        };

        public ReferenceDataManagerTests()
        {
            _referenceDataRepository = Substitute.For<IReferenceDataRepository>();
            _referenceDataManager = new ReferenceDataManager(_referenceDataRepository);
        }

        [Fact]
        public void GetReferenceData_ShouldReturnReferenceData()
        {
            // Arrange
            _referenceDataRepository.GetOccupations().Returns(MockOccupations);
            _referenceDataRepository.GetOccupationRatings().Returns(MockOccupationRatings);
            _referenceDataRepository.GetStates().Returns(MockStates);

            // Act
            var response = _referenceDataManager.GetReferenceData();

            // Assert
            response.ShouldNotBeNull();
            response.Occupations.ShouldNotBeNull();
            response.Occupations.Count.ShouldBe(1);           
            response.Occupations.First().Name.ShouldBe("test occupation");
            response.OccupationRatings.ShouldNotBeNull();
            response.OccupationRatings.Count.ShouldBe(1);
            response.OccupationRatings.First().Name.ShouldBe("test occupation rating");
            response.States.ShouldNotBeNull();
            response.States.Count.ShouldBe(1);
            response.States.First().Name.ShouldBe("test state");
        }
    }
}
