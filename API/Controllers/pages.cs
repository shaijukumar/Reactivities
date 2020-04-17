using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("pages/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class pages : ControllerBase
    { 
        // GET pages/pages
        [HttpGet]
        public string Get()
        {            
            return "Test 123 44 55";
        }
    }
}