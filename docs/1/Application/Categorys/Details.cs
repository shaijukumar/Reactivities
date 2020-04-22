using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Categorys
{
    public class Details
    {
        public class Query : IRequest<Category>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Category>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Category> Handle(Query request, CancellationToken cancellationToken)
            {
                var category  = await _context.Categorys                    
                    .FindAsync(request.Id);

                if (category == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not found" });

               return category;
            }
        }
            
    }
}
