using AutoMapper;
using BusinessBack.Models;
using BusinessBack.Models.DTO;
using BusinessBack.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusinessBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    { 
        
        private readonly IMapper _mapper;
        private readonly IBusinessRepository _businessRepository;

        public BusinessController( IMapper mapper, IBusinessRepository businessRepository)
        {
            _mapper = mapper;
            _businessRepository = businessRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listBusiness = await _businessRepository.GetListBusiness();
                var listBusinessDto = _mapper.Map<IEnumerable<BusinessDTO>>(listBusiness);
                return Ok(listBusinessDto);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async  Task<IActionResult> Get (int id)
        {
            try
            {
                var business = await _businessRepository.GetBusiness(id);
                if (business == null)
                {
                    return NotFound();
                }
                var businessDto = _mapper.Map<BusinessDTO>(business);
                return Ok(businessDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var business = await _businessRepository.GetBusiness(id);

                if(business == null)
                {
                    return NotFound();
                }
                else
                {
                    await _businessRepository.DeleteBusiness(business);
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(BusinessDTO businessDto)
        {
            try
            {
                var business = _mapper.Map<Business>(businessDto);
                business.dateCreated = DateTime.Now;
                business = await _businessRepository.AddBusiness(business);
                var businessItemDto = _mapper.Map<BusinessDTO>(business);

                return CreatedAtAction("Get", new { id = businessItemDto.Id }, businessItemDto);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, BusinessDTO businessDto)
        {
            try
            {
                var business = _mapper.Map<Business>(businessDto);
                if(id != business.Id)
                {
                    return BadRequest();
                }

                var businessItem = await _businessRepository.GetBusiness(id);
                if (businessItem == null)
                {
                    return NotFound();
                }
                await _businessRepository.UpdateBusiness(business);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
