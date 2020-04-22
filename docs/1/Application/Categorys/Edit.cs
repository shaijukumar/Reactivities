using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Categorys
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string CategoryId { get; set; }
            public string URLTitle { get; set; }
            public string CategoryHtml { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>{
           public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.CategoryId).NotEmpty();
                RuleFor(x => x.URLTitle).NotEmpty();
                RuleFor(x => x.CategoryHtml).NotEmpty();
            }
        }
    
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var category  = await _context.Categorys                    
                    .FindAsync(request.Id);

                if (category == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not found" });

                category.Title = request.Title ?? category.Title;
                category.Description = request.Description ?? category.Title;
                category.CategoryId = request.CategoryId ?? category.Title;
                category.URLTitle = request.URLTitle ?? category.Title;
                category.CategoryHtml = request.CategoryHtml ?? category.Title;
   
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
            
    }
}
