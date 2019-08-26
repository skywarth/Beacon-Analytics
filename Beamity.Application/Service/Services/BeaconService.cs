using AutoMapper;
using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconDTOs;
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
    public class BeaconService : IBeaconService
    {
        /*
         * This Class for define the Methods
         * This class contain 
         *  1.CreateBeacon
         *  2.DeleteBeacon
         *  3.GetAllBeacons
         *  4.GetBeacon
         *  5.UpdateBeacon methods
         */
        private readonly IBaseGenericRepository<Beacon> _beaconRepository;
        private readonly IBaseGenericRepository<Artifact> _artifactRepository;
        private readonly IMapper _mapper;

        public BeaconService(IBaseGenericRepository<Beacon> beaconRepository, IBaseGenericRepository<Artifact> artifactRepository, IMapper mapper)
        {
            _beaconRepository = beaconRepository;
            //_locationRepository = locationRepository;
            _artifactRepository = artifactRepository;
            _mapper = mapper;
        }

        public async Task CreateBeacon(CreateBeaconDTO input)
        {
            var beacon = _mapper.Map<Beacon>(input);
            beacon.Artifact = await _artifactRepository.GetById(input.ArtifactId);
            await _beaconRepository.Create(beacon);
        }

        public async Task DeleteBeacon(DeleteBeaconDTO input)
        {
            await _beaconRepository.Delete(input.Id);
        }
        // LocationID
        public async Task<List<ReadBeaconDTO>> GetAllBeacons(EntityDTO input)
        {
            var beacons = await _beaconRepository
                            .GetAll()
                            .Include(x => x.Artifact)
                            .Where(x => x.IsActive && x.Artifact.Id == input.Id)//FIXME not sure why there is x.artifact.id check ?
                            .ToListAsync();
            var result = _mapper.Map<List<ReadBeaconDTO>>(beacons);
            return result;
        }
        // UserID
        public async Task<List<ReadBeaconDTO>> GetAllBeaconsWithUser(EntityDTO input)
        {
            var beacons = await _beaconRepository
                            .GetAll()
                            .Include(x => x.Artifact)
                            .ThenInclude( x => x.Location)
                            .ThenInclude(x => x.User)
                            .Where(x => x.IsActive && x.Artifact.Location.User.Id == input.Id)
                            .ToListAsync();
            var result = _mapper.Map<List<ReadBeaconDTO>>(beacons);
            return result;
        }

        public async Task<ReadBeaconDTO> GetBeacon(EntityDTO input)
        {
            var beacon = await _beaconRepository.GetById(input.Id);
            var result = _mapper.Map<ReadBeaconDTO>(beacon);
            return result;
        }

        public async Task UpdateBeacon(UpdateBeaconDTO input)
        {
            var beacon = _mapper.Map<Beacon>(input);
            if (Guid.Empty != input.ArtifactId)
                beacon.Artifact = await _artifactRepository.GetById(input.ArtifactId);
            await _beaconRepository.Update(input.Id, beacon);
        }
    }
}
