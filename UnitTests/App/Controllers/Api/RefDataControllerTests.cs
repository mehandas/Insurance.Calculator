using Insurance.Calculator.App.Controllers.Api;
using Insurance.Calculator.Services.Manager;
using Insurance.Calculator.Services.Models;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shouldly;
using System.Collections.Generic;
using Xunit;

namespace Insurance.Calculator.UnitTests.App.Controllers.Api
{
    [Collection("RefDataController")]
    public class RefDataControllerTests
    {
        private readonly RefDataController _refDataController;
        private readonly IReferenceDataManager _referenceDataManager;

        public RefDataControllerTests()
        {
            _referenceDataManager = Substitute.For<IReferenceDataManager>();
            _refDataController = new RefDataController(_referenceDataManager);
        }

        [Fact]
        public void Get_ShouldInvokeReferenceDataManager_When_Exceuted()
        {
            // Act
            _refDataController.Get();

            // Assert
            _referenceDataManager.Received().GetReferenceData();
        }

        [Fact]
        public void Get_ShouldReturnReferenceDataFromManager()
        {
            // Arrange
            var referenceData = new ReferenceData
            {
                OccupationRatings = new List<OccupationRating>
                {
                    new OccupationRating(2, "test rating", 3)
                },
                Occupations = new List<Occupation>
                {
                    new Occupation(1, "test occupation", 2)
                },
                States = new List<State>
                {
                    new State(1, "test")
                }

            };
            _referenceDataManager.GetReferenceData().Returns(referenceData);

            // Act
            var response = _refDataController.Get();

            // Assert
            response.ShouldNotBeNull();
            response.ShouldBeOfType(typeof(OkObjectResult));
            var result = response as OkObjectResult;
            result.StatusCode.ShouldBe(200);
            result.Value.ShouldBeSameAs(referenceData);
        }
    }
}
