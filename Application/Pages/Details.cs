using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pages
{
    public class Details
    {
        public class Query : IRequest<Page>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Page>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Page> Handle(Query request, CancellationToken cancellationToken)
            {
                var page  = await _context.Pages                    
                    .FindAsync(request.Id);

                if (page == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not found" });

               return page;
            }
        }
            
    }
}