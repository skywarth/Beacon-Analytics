using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class RoomsArtifactHourly
    {
        private string roomName;
        private List<ArtifactRoomTimesDTO> artifacts;

        public string RoomName { get => roomName; set => roomName = value; }
        public List<ArtifactRoomTimesDTO> Artifacts { get => artifacts; set => artifacts = value; }
    }
}
