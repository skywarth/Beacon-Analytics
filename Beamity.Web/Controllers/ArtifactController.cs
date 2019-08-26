using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Beamity.Application.DTOs;
using Beamity.Application.DTOs.ArtifactDTOs;
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
    public class ArtifactController : Controller
    {
        public string guid;

        private readonly IBlobManager _blobManager;
        private readonly IArtifactService _artifactService;
        private readonly IHostingEnvironment hostingEnvironment;

        public ArtifactController(IBlobManager blobManager, IArtifactService artifactService, IHostingEnvironment env)
        {
            _blobManager = blobManager;
            _artifactService = artifactService;
            hostingEnvironment = env ?? throw new ArgumentNullException(nameof(env));
        }
        public async Task<IActionResult> Index()
        {
            //Locatiion Id
            EntityDTO dto = new EntityDTO()
            {
                Id = Guid.Parse(HttpContext.Session.GetString("LocationId"))
            };
            IEnumerable<ReadArtifactDTO> artifacts = await _artifactService.GetAllArtifacts(dto);
            return View(artifacts);
        }
        [HttpPost]
        public async Task<IActionResult> CreateArtifact(CreateArtifactViewModel input)
        {
            string imagesLocation = "/Images/";
            string fileName ="" ;
            try
            {
                var path = "";
                if (input.File != null)
                {
                    fileName = Path.GetFileName(input.File.FileName);

                    // this should yield something like:
                    //     c:\inetpub\yourappname\wwwroot\images\image-file-name.png
                    path = Path.Combine(hostingEnvironment.WebRootPath, "Images", fileName);

                    using (var fs = System.IO.File.Open(path, FileMode.Create))
                    {
                        input.File.OpenReadStream().CopyTo(fs);

                        fs.Flush();
                    }
                }
                //string url =_blobManager.UploadImageAsBlob(input.File);

                CreateArtifactDTO data = new CreateArtifactDTO()
                {
                    Name = input.Name,
                    MainImageURL = imagesLocation + fileName,
                    RoomId = input.RoomId,
                    LocationId = input.LocationId
                };
                await _artifactService.CreateArtifact(data);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpPut]
        public async Task UpdateArtifact(UpdateArtifactViewModel input)
        {
            try
            {
                string url = await _blobManager.UploadImageAsBlob(input.File);
                UpdateArtifactDTO data = new UpdateArtifactDTO()
                {
                    Id = input.Id,
                    Name = input.Name,
                    MainImageURL = url,
                    RoomId = input.RoomId
                };

                await _artifactService.UpdateArtifact(data);

            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}