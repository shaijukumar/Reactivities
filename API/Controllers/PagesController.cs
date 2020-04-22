using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Pages;
using Domain;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System;

namespace API.Controllers
{
    public class PagesController: BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Page>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Page>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create( Create.Command  command)
        {            
            return await Mediator.Send(command);
        }     

        [HttpPut("{id}")]                
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]        
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}