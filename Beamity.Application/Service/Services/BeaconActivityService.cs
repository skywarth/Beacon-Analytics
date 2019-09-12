using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.Service.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Beamity.Core.Models;
using Beamity.EntityFrameworkCore.EntityFrameworkCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

using Beamity.Application.DTOs.CustomDTOs;
using Beamity.Application.DTOs.ArtifactDTOs;

namespace Beamity.Application.Service.Services
{
    public class BeaconActivityService : IBeaconActivityService
    {


        private readonly IBaseGenericRepository<BeaconActivity> _beaconActivityRepository;
        private readonly IBaseGenericRepository<Beacon> _beaconRepository;
        private readonly IMapper _mapper;
        public IQueryable<BeaconActivity> publicSet=null;

        public BeaconActivityService(IBaseGenericRepository<BeaconActivity> repository, IBaseGenericRepository<Beacon> beaconRepository, IMapper mapper)
        {
            _beaconActivityRepository = repository;
            _beaconRepository = beaconRepository;
            _mapper = mapper;
            publicSet= _beaconActivityRepository.GetAll();
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




        public async Task<double> GetArtifactsVisitorAverage(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)


                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)
                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by t.BeaconId into grouped
                          select new
                          {
                              id = grouped.Key,
                              Count = grouped.Count()

                          };
            double average = subList.Average(x => x.Count);
            average = Math.Round(average, 2);
            return average;
        }


        public async Task<double> GetRoomsVisitorAverage(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()

           var beaconActivity=await publicSet
                .Include(x=>x.Beacon)
                .ThenInclude(x=>x.Artifact.Room)

                .Where(x => x.EnterTime.Date== DateTime.Now.Date)
                .Where(x=>x.Beacon.Artifact.Room.Floor.Building.Location.Id==input.Id)
                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by t.Beacon.Artifact.Room.Id into grouped
                          select new
                          {
                              id = grouped.Key,
                              Count = grouped.Count()

                          };
            double average = subList.Average(x => x.Count);
            average = Math.Round(average, 2);
            return average;
        }


        public async Task<double> GetArtifactsWatchTimeAverage(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                
                .Where(x=>x.EnterTime.Date==DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)
                
                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by t.Beacon.Id into grouped
                          where grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds) >= 0
                          select new
                          {
                              id = grouped.Key,
                              watchTime=grouped.Sum(t=>(t.ExitTime-t.EnterTime).TotalSeconds)




                          };
            double average = subList.Average(x => x.watchTime);
            average = Math.Round(average, 2);
            return average;
        }


        public async Task<double> GetRoomsWatchTimeAverage(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x=>x.Artifact.Room)

                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by t.Beacon.Artifact.Room.Id into grouped
                          where grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds) >= 0
                          select new
                          {
                              id = grouped.Key,
                              watchTime = grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds)




                          };
            double average = subList.Average(x => x.watchTime);
            average = Math.Round(average, 2);
            return average;
        }


        public async Task<double> GetLocationBounceRate(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                //.Where(x=>(x.ExitTime - x.EnterTime).TotalSeconds <=10000)
                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var bounceList = from t in beaconActivity
                          where (t.ExitTime-t.EnterTime).TotalSeconds<=30
                          group t by t.Beacon.Artifact.Id into grouped
                          
                          select new
                          {
                              id = grouped.Key,
                              bounceCount= grouped.Count()




                          };
            double bounceSum = bounceList.Sum(x => x.bounceCount);
            double rate = bounceSum/(beaconActivity.Count)*100;
            rate = Math.Round(rate, 2);
            return rate;
        }


        public async Task<int> GetCurrentVisitors(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                //.Where(x=>(x.ExitTime - x.EnterTime).TotalSeconds <=10000)
                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                             //where (t.ExitTime - t.EnterTime).TotalSeconds <= 100
                             group t by t.UserId into grouped

                             select new
                             {
                                 id = grouped.Key,
                                 latestActivity=grouped.Max(x=>x.ExitTime)




                             };

            var subList2 = from t in subList
                           where (DateTime.Now.TimeOfDay.Subtract(t.latestActivity.TimeOfDay)).TotalMinutes < 30 && (DateTime.Now.TimeOfDay.Subtract(t.latestActivity.TimeOfDay)).TotalMinutes  >= 0 //&& 
                           select new
                           {
                               id = t.id,
                               diff=(DateTime.Now.TimeOfDay.Subtract(t.latestActivity.TimeOfDay))
                           };


            int count= subList2.Count();
            //rate = Math.Round(rate, 2);
            return count;
        }


        public async Task<double> GetUserWatchTimeAverage(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                          
                          group t by t.UserId into grouped
                          where grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds)>=0
                          select new
                          {
                              id = grouped.Key,
                              watchTime = grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds)




                          };
            double average = subList.Average(x => x.watchTime);
            average = Math.Round(average, 2);
            return average;
        }


        public async Task<double> GetUserArtifactAverage(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                //.Where(x=>(x.ExitTime - x.EnterTime).TotalSeconds <=10000)
                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                              //where (t.ExitTime - t.EnterTime).TotalSeconds <= 100
                          group t by t.UserId into grouped

                          select new
                          {
                              id = grouped.Key,
                              count = grouped.Count()




                          };




            double count = subList.Average(x => x.count);
            count = Math.Round(count, 2);
            return count;
        }

        public async Task<List<MaxMinVisitorArtifactDTO>> GetMaxVisitorArtifact(EntityDTO input)
        {

            DateTime current = DateTime.Now.Date;

            DateTime yesterday = current.AddDays(-1).Date;
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                //.Where(x=>(x.ExitTime - x.EnterTime).TotalSeconds <=10000)
                .Where(x => x.EnterTime.Date == current || x.EnterTime.Date == yesterday)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var todayList = from t in beaconActivity
                          .Where(x => x.EnterTime.Date == current)
                            group t by (t.Beacon.Artifact.Id, t.Beacon.Artifact.Name, t.EnterTime.Date) into grouped

                            select new MaxMinVisitorArtifactDTO
                            {
                                Id1 = grouped.Key.Id,
                                Name = grouped.Key.Name,
                                Count = grouped.Count(),
                                Date = grouped.Key.Date
                          };

            todayList = todayList.OrderByDescending(x => x.Count);

            MaxMinVisitorArtifactDTO todayMax = todayList.First();
            MaxMinVisitorArtifactDTO todayMin = todayList.Last();


            

            var yesterdayList = from t in beaconActivity
                            .Where(x => x.EnterTime.Date == yesterday)
                            .Where(x => x.Beacon.Artifact.Id == todayMax.Id1 || x.Beacon.Artifact.Id == todayMin.Id1)
                                group t by (t.Beacon.Artifact.Id, t.Beacon.Artifact.Name) into grouped

                                select new MaxMinVisitorArtifactDTO
                                {
                                    Id1 = grouped.Key.Id,
                                    Name = grouped.Key.Name,
                                    Count = grouped.Count()
                               };

            yesterdayList = yesterdayList.OrderByDescending(x => x.Count);



            MaxMinVisitorArtifactDTO yesterdayMax = yesterdayList.First();
            MaxMinVisitorArtifactDTO yesterdayMin = yesterdayList.Last();

            List<MaxMinVisitorArtifactDTO> resultSet=new List<MaxMinVisitorArtifactDTO>();
            resultSet.Add(todayMax);
            resultSet.Add(todayMin);
            resultSet.Add(yesterdayMax);
            resultSet.Add(yesterdayMin);

            //rate = Math.Round(rate, 2);
            return resultSet;
        }


        public async Task<List<HourlyVisitorMuseumDTO>> GetHourlyVisitorsMuseum(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)


                
                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                //.Where(x => x.EnterTime.Hour >= 21)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by tempClass.TruncateToHourStart(t.EnterTime).TimeOfDay into grouped
                          
                          orderby grouped.Key ascending
                          select new HourlyVisitorMuseumDTO
                          {
                              Hour = grouped.Key,
                              Count = grouped.Count()




                          };




            var chart = subList.ToList();
            //rate = Math.Round(rate, 2);
            return chart;
        }

        public async Task<List<RoomsArtifactHourly>> GetHourlyVisitorsArtifact(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                //.Where(x=>(x.ExitTime - x.EnterTime).TotalSeconds <=10000)
                .Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                              //where (t.ExitTime - t.EnterTime).TotalSeconds <= 100
                          select new
                          {
                              Id=t.Beacon.Artifact.Room.Id,
                              Name=t.Beacon.Artifact.Room.Name
                              
                              




                          };

            var subList2 = from t in beaconActivity

                           group t by (t.Beacon.Artifact.Id, t.Beacon.Artifact.Name, t.Beacon.Artifact.Room.Name) into grouped
                           select new ReadArtifactDTO

                           {
                               Id = grouped.Key.Id,
                               Name = grouped.Key.Item2,
                               RoomName=grouped.Key.Item3
                           };


            var subList3 = from t in beaconActivity
                              //where (t.ExitTime - t.EnterTime).TotalSeconds <= 100
                          group t by (tempClass.TruncateToHourStart(t.EnterTime),t.Beacon.Artifact.Id) into grouped
                          orderby grouped.Key ascending
                          select new HourlyArtifactDTO
                          {
                              Hour = grouped.Key.Item1.TimeOfDay,
                              ArtifactId=grouped.Key.Id,
                              Count = grouped.Count()




                          };
            var list = subList.Distinct().ToList();
            var list2 = subList2.Distinct().ToList();
            var list3 = subList3.ToList();

            var list4 = from k in list2
                        join time in list3 on k.Id equals time.ArtifactId into m
                        select new ArtifactRoomTimesDTO
                        {
                            Id = k.Id,
                            Name = k.Name,
                            RoomName = k.RoomName,
                            Times = m.ToList()

                        };
            /* var subList3 = subList.ToList().GroupJoin(subList2.ToList(), room => room.Name, x=>x.RoomName, (room, artifact) => new
             {
                 room.Id,
                 room.Name,
                 artifact.Name

             }
             );*/



            var finalList = from d in list
                            join s in list4 on d.Name equals s.RoomName into g

                            select new RoomsArtifactHourly
                            {
                                RoomName = d.Name,
                                Artifacts = g.ToList()
                           };
            var final = finalList.ToList();

            //fix by changing join order, time->artifact->room 
            
 

    


            return final;
        }

        public async Task<List<BehaviourFlowListDTO>> GetBehaviourFlow(BehaviourFlowRangeDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)


                .Where(x => x.EnterTime.Date >=input.Start.Date && x.EnterTime.Date<=input.End.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)
                 /*.Where(x => x.EnterTime.Date == DateTime.Now.Date)
                 .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)*/

                 .ToListAsync();


            var usersWithMultipleActivity = from t in beaconActivity
                                           group t by (t.UserId) into grouped
                                           where grouped.Count() > 1
                                           select new
                                           {
                                               grouped.Key
                                           };
            var usersWithMultipleActivityList = usersWithMultipleActivity.ToList();


            List<BehaviourFlowDTO> activities = new List<BehaviourFlowDTO>();
            foreach (var user in usersWithMultipleActivityList)
            {
                Guid id = user.Key;
                var sub = from t in beaconActivity
                              where t.UserId == id
                              orderby t.EnterTime ascending
                              select new ReadBeaconActivityDTO
                              {
                                  Id=t.Id,
                                  BeaconId=t.BeaconId,
                                  Beacon=t.Beacon,
                                  EnterTime=t.EnterTime,
                                  ExitTime=t.ExitTime,
                                  UserId=t.UserId
                                  
                              };
                var subList = sub.ToList();//all activities for a user
                

                while (subList.Count > 1)
                {
                    var firstAct = subList.First();
                    subList.RemoveAt(0);
                    var nextAct = subList.First();
                    subList.RemoveAt(0);
                    activities.Add(new BehaviourFlowDTO(firstAct, nextAct));
                }

                
            }
            //Counts are all the way 1 problem
            var behaviourFlow = from t in activities
                                group t by (t.From.Beacon.Artifact.Room.Name, t.To.Beacon.Artifact.Room.Name, t.From.Beacon.Artifact.Room.Id,t.To.Beacon.Artifact.Room.Id) into grouped
                                where (grouped.Key.Item1!=grouped.Key.Item2)
                                select new BehaviourFlowListDTO
                                {
                                    From = grouped.Key.Item1,
                                    To = grouped.Key.Item2,
                                    Count = grouped.Count()
                                };




            //rate = Math.Round(rate, 2);
            return behaviourFlow.ToList();
        }


        public async Task<string> GetVisitorChange(EntityDTO input)
        {
            DateTime current = DateTime.Now.Date;

            DateTime yesterday = current.AddDays(-1).Date;
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)

                .Where(x => x.EnterTime.Date == current || x.EnterTime.Date == yesterday)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                            group t by (t.EnterTime.Date) into grouped
                            orderby grouped.Key ascending
                            select new 
                            {
                                date=grouped.Key,
                                count = grouped.Count()
                            };
            var list = subList.ToList();
            //decimal calculation = ((Convert.ToDecimal(list[1].count) / Convert.ToDecimal(list[0].count)) * Convert.ToDecimal(100));
            decimal calculation = Convert.ToDecimal(list[1].count - list[0].count) / Convert.ToDecimal(list[0].count) * 100;
            string result = Math.Round(calculation, 2).ToString();
            string prefix;
            if (calculation >= 0)
            {
                prefix = "+%";
            }
            else
            {
                result = result.Remove(0, 1);
                prefix = "-%";
            }
            

            return result.Insert(0, prefix); ;
        }


        public async Task<string> GetDurationChange(EntityDTO input)
        {
            DateTime current = DateTime.Now.Date;

            DateTime yesterday = current.AddDays(-1).Date;
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)

                .Where(x => x.EnterTime.Date == current || x.EnterTime.Date == yesterday)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by t.EnterTime.Date into grouped
                          //where grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds) >= 0
                          select new
                          {
                              date=grouped.Key,
                              watchTime = grouped.Sum(t => (t.ExitTime - t.EnterTime).TotalSeconds)
                          };
            var list = subList.ToList();
            //decimal calculation = ((Convert.ToDecimal(list[1].count) / Convert.ToDecimal(list[0].count)) * Convert.ToDecimal(100));
            decimal calculation = Convert.ToDecimal(list[1].watchTime - list[0].watchTime) / Convert.ToDecimal(list[0].watchTime) * 100;
            
            string result = Math.Round(calculation, 2).ToString();
            string prefix;

            if (calculation >= 0)
            {
                prefix = "+%";
            }
            else
            {
                result = result.Remove(0, 1);
                prefix = "-%";
            }
            

            return result.Insert(0,prefix);
        }



        //ARTIFACT PAGE




        public async Task<List<ArtifactVisitorCountAndDurationAverageDTO>> GetArtifactVisitorCountAndDurationAverage(EntityDTO input)//artifact id
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)


                //.Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Id==input.Id)
                 .ToListAsync();

            var sub = from t in beaconActivity
                          group t by new { t.EnterTime.Date} into grouped
                          select new ArtifactVisitorCountAndDurationAverageDTO
                          {
                              //Id = grouped.Key.Id,
                              Date=grouped.Key.Date.ToString("yyyy-MM-dd"),
                              Count = grouped.Count(),
                              AverageTime = grouped.Average(t => (t.ExitTime - t.EnterTime).TotalSeconds)

                          };
            var subList = sub.OrderBy(x=>x.Date).ToList();
            /*double durationAverage = subList.First().watchTime / subList.First().Count;
             durationAverage = Math.Round(durationAverage, 2);
             int count = subList.First().Count;*/
            return subList;
        }


        public async Task<List<DateAndAverageDTO>> GetArtifactCountPerUser(EntityDTO input)//location id
        {
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)


                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id==input.Id)
                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by new { t.EnterTime.Date, t.UserId } into grouped
                          select new
                          {
                              Date = grouped.Key.Date,
                              User=grouped.Key.UserId,
                              Count = grouped.Count()

                          };
            var subList2 = from t in subList
                           group t by t.Date into grouped
                           select new DateAndAverageDTO
                           {
                               Date = grouped.Key.ToString("yyyy-MM-dd"),
                               Average = Math.Round(grouped.Average(x => x.Count), 2)
                           };


            return subList2.OrderBy(x=>x.Date).ToList();
        }

        public async Task<List<ArtifactVisitorCountAndDurationAverageDTO>> GetArtifactsVisitorCountAndDurationAverage(EntityDTO input)//locationId
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x=>x.Artifact)

                //.Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)
                 .ToListAsync();

            var sub = from t in beaconActivity
                      group t by new { t.EnterTime.Date,t.Beacon.Artifact.Id } into grouped
                      select new ArtifactVisitorCountAndDurationAverageDTO
                      {
                          //Id = grouped.Key.Id,
                          Date = grouped.Key.Date.ToString("yyyy-MM-dd"),
                          Count = grouped.Count(),
                          AverageTime = grouped.Average(t => (t.ExitTime - t.EnterTime).TotalSeconds)

                      };
            var subList = sub.OrderBy(x => x.Date).ToList();
            /*double durationAverage = subList.First().watchTime / subList.First().Count;
             durationAverage = Math.Round(durationAverage, 2);
             int count = subList.First().Count;*/
            return subList;
        }

        public async Task<List<BounceRatesDTO>> GetAllBounceRates(EntityDTO input)
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x => x.Artifact.Room)

                //.Where(x=>(x.ExitTime - x.EnterTime).TotalSeconds <=10000)
                //.Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)

                 .ToListAsync();

            var bounceList = from t in beaconActivity
                             where (t.ExitTime - t.EnterTime).TotalSeconds <= 30
                             //group t by t.Beacon.Artifact.Id into grouped
                             group t by t.EnterTime.Date into grouped
                             select new
                             {
                                 date = grouped.Key.Date,
                                 bounceCount = grouped.Count()




                             };

            var nonBounceList = from t in beaconActivity
                             where !((t.ExitTime - t.EnterTime).TotalSeconds <= 30)
                                //group t by t.Beacon.Artifact.Id into grouped
                                group t by t.EnterTime.Date into grouped
                             select new
                             {
                                 date = grouped.Key.Date,
                                 nonBounceCount = grouped.Count()




                             };

            var joinner = from t in bounceList
                          join x in nonBounceList on t.date equals x.date
                          select new
                          {
                              Date=t.date,
                              bounce=t.bounceCount,
                              nonBounce=x.nonBounceCount
                          };

            var resultList = from t in joinner
                             select new BounceRatesDTO
                             {
                                 Date = t.Date.ToString("yyyy-MM-dd"),
                                 Value = Math.Round((double)((double)t.bounce / (double)(t.nonBounce + t.bounce)) * 100, 2)
                                 //Value = Math.Round(Convert.ToDouble(grouped. / (grouped.Sum(x=>x.bounceCount)) * 100),2)
                            };
            /*double bounceSum = bounceList.Sum(x => x.bounceCount);
            double rate = bounceSum / (beaconActivity.Count) * 100;
            rate = Math.Round(rate, 2);*/
                return resultList.ToList();
        }


        public async Task<List<RoomVisitorCountAndDurationAverageDTO>> GetRoomVisitorCountAndDurationAverage(EntityDTO input)//room id
        {
            //var beaconActivity = await _beaconActivityRepository.GetAll()
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x=>x.Artifact.Room)

                //.Where(x => x.EnterTime.Date == DateTime.Now.Date)
                .Where(x => x.Beacon.Artifact.Room.Id == input.Id)
                 .ToListAsync();

            var sub = from t in beaconActivity
                      group t by new { t.EnterTime.Date } into grouped
                      select new RoomVisitorCountAndDurationAverageDTO
                      {
                          //Id = grouped.Key.Id,
                          Date = grouped.Key.Date.ToString("yyyy-MM-dd"),
                          Count = grouped.Count(),
                          AverageTime = grouped.Average(t => (t.ExitTime - t.EnterTime).TotalSeconds)

                      };
            var subList = sub.OrderBy(x => x.Date).ToList();
            /*double durationAverage = subList.First().watchTime / subList.First().Count;
             durationAverage = Math.Round(durationAverage, 2);
             int count = subList.First().Count;*/
            return subList;
        }

        public async Task<List<DateAndAverageDTO>> GetRoomCountPerUser(EntityDTO input)//location id
        {
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x=>x.Artifact)
                .ThenInclude(x=>x.Room)

                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)
                 .ToListAsync();

            var subList = from t in beaconActivity
                          group t by new { t.EnterTime.Date, t.UserId,t.Beacon.Artifact.Room.Id } into grouped
                          select new
                          {
                              Date = grouped.Key.Date,
                              User = grouped.Key.UserId,
                              Count = grouped.Count()
            
                          };
            

            var subList2 = from t in subList
                           group t by t.Date into grouped
                           select new DateAndAverageDTO
                           {
                               Date = grouped.Key.ToString("yyyy-MM-dd"),
                               Average = Math.Round(grouped.Average(x => x.Count), 2)
                           };


            return subList2.OrderBy(x => x.Date).ToList();
        }

        public async Task<List<RoomVisitorCountAndDurationAverageDTO>> GetRoomsVisitorCountAndDurationAverage(EntityDTO input)//locationId
        {
            
            var beaconActivity = await publicSet
                .Include(x => x.Beacon)
                .ThenInclude(x=>x.Artifact)
                .ThenInclude(x=>x.Room)

                    
                .Where(x => x.Beacon.Artifact.Room.Floor.Building.Location.Id == input.Id)
                 .ToListAsync();

            var sub = from t in beaconActivity
                      group t by new { t.EnterTime.Date,t.Beacon.Artifact.Room.Id } into grouped
                      select new RoomVisitorCountAndDurationAverageDTO
                      {
                          //Id = grouped.Key.Id,
                          Date = grouped.Key.Date.ToString("yyyy-MM-dd"),
                          Count = grouped.Count(),
                          AverageTime = grouped.Average(t => (t.ExitTime - t.EnterTime).TotalSeconds)

                      };
            var subList = sub.OrderBy(x => x.Date).ToList();
            /*double durationAverage = subList.First().watchTime / subList.First().Count;
             durationAverage = Math.Round(durationAverage, 2);
             int count = subList.First().Count;*/
            return subList;
        }








    }
    static class tempClass
    {
        public static DateTime TruncateToHourStart(this DateTime dt)
        {
            return new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, 0, 0);
        }
    }



}

