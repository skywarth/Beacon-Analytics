using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.Service.IServices;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Beamity.Application.DTOs;
using Beamity.Application.Service.IServices;
using Beamity.Core.Models;
using Beamity.EntityFrameworkCore.EntityFrameworkCore.Interfaces;
using Beamity.EntityFrameworkCore.EntityFrameworkCore.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Beamity.Application.Service.Services
{
    public class BeaconActivityService : IBeaconActivityService
    {


        private readonly IBaseGenericRepository<BeaconActivity> _beaconActivityRepository;
        private readonly IBaseGenericRepository<Beacon> _beaconRepository;
        private readonly IMapper _mapper;


        public BeaconActivityService(IBaseGenericRepository<BeaconActivity> repository, IBaseGenericRepository<Beacon> beaconRepository, IMapper mapper)
        {
            _beaconActivityRepository = repository;
            _beaconRepository = beaconRepository;
            _mapper = mapper;
        }
        public async Task CreateBeaconActivity(CreateBeaconActivityDTO input)
        {
            var beaconActivity = _mapper.Map<BeaconActivity>(input);
            beaconActivity.Beacon = await _beaconRepository.GetById(input.BeaconId);

            await _beaconActivityRepository.Create(beaconActivity);
        }

        public async Task DeleteBeaconActivity(DeleteBeaconActivityDTO input)
        {
            await _beaconActivityRepository.Delete(input.Id);
        }

        public async Task<List<ReadBeaconActivityDTO>> GetAllBeaconActivities(EntityDTO input)
        {
            var beaconActivities = await _beaconActivityRepository
                .GetAll()

                .Include(a=>a.Beacon)
                .ThenInclude(x=>x.Artifact)
                .ThenInclude(x => x.Room)
                .ThenInclude(x => x.Floor)
                .ThenInclude(x => x.Building)
                .ThenInclude(x => x.Location)
                .Where(z => z.IsActive == true).ToListAsync();


            var result = _mapper.Map<List<ReadBeaconActivityDTO>>(beaconActivities);
            /*foreach (var item in beaconActivities)
            {
                ReadBeaconActivityDTO dto = new ReadBeaconActivityDTO();

                dto = _mapper.Map<ReadBeaconActivityDTO>(item);
                dto.BuildingName = item.Building.Name;

                result.Add(dto);
            }*/
            return result;
        }

        public async Task<ReadBeaconActivityDTO> GetBeaconActivity(EntityDTO input)
        {
            var beaconActivity = await _beaconActivityRepository.GetById(input.Id);
            return _mapper.Map<ReadBeaconActivityDTO>(beaconActivity);
        }


        public async Task<Double> GetArtifactsVisitorAverage(EntityDTO input)
        {
            var beaconActivity = await _beaconActivityRepository.GetAll()

                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by t.BeaconId into grouped
                          select new
                          {
                              id = grouped.Key,
                              Count = grouped.Count()

                          };
            double average = subList.Average(x => x.Count);
            return average;
        }
    }
}
