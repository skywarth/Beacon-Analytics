using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class ArtifactRoomTimesDTO
    {
        private Guid id;
        private string name;
        private string roomName;
        private List<HourlyArtifactDTO> times;

        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string RoomName { get => roomName; set => roomName = value; }
        public List<HourlyArtifactDTO> Times { get => times; set => times = value; }
    }
}
