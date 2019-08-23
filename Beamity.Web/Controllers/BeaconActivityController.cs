using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Beamity.Application.DTOs;
using Beamity.Application.DTOs.BeaconActivityDTOs;
using Beamity.Application.Service.IServices;
using Beamity.Web.Blob;
using Beamity.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Web;
using Microsoft.AspNetCore.Hosting;

namespace Beamity.Web.Controllers
{

    [Authorize]
    public class BeaconActivityController : Controller
    {

        public string guid;

        private readonly IBeaconActivityService _beaconActivityService;
        private readonly IHostingEnvironment hostingEnvironment;


        public BeaconActivityController(IBeaconActivityService beaconActivityService, IHostingEnvironment env)
        {
            _beaconActivityService = beaconActivityService;
            hostingEnvironment = env ?? throw new ArgumentNullException(nameof(env));
        }


        public async Task<IActionResult> Index()
        {//TODO relation for beacon itself
            EntityDTO dto = new EntityDTO();
            /*//Locatiion Id
            EntityDTO dto = new EntityDTO()
            {
                Id = Guid.Parse(HttpContext.Session.GetString("LocationId"))
            };*/
            IEnumerable<ReadBeaconActivityDTO> BeaconActivity = await _beaconActivityService.GetAllBeaconActivities(dto);
            return View(BeaconActivity);
        }
    }
}