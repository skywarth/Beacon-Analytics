using System;
using System.Collections.Generic;
using System.Text;

namespace Beamity.Application.DTOs.CustomDTOs
{
    public class MaxMinVisitorArtifactDTO : BaseReadDTO
    {


        private Guid id;
        private string name;
        private int count;
        private DateTime date;
        public Guid Id1 { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public int Count { get => count; set => count = value; }
        public DateTime Date { get => date; set => date = value; }
    }
}
