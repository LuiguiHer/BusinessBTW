using AutoMapper;
using BusinessBack.Models.DTO;

namespace BusinessBack.Models.Profiles
{
    public class BusinessProfile: Profile
    {
        public BusinessProfile()
        {
            CreateMap<Business, BusinessDTO>();
            CreateMap<BusinessDTO, Business>();
        }
    }
}
