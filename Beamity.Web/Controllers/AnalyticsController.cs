using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Beamity.Web.Controllers
{
    public class AnalyticsController : Controller
    {
        public IActionResult RoomsIndex()
        {
            return View();
        }

        public IActionResult ArtifactsIndex()
        {
            return View();

        }

        public IActionResult MuseumIndex()
        {
            return View();
        }
    }
}