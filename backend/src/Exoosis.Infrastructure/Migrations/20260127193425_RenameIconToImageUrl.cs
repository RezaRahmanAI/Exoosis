using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exoosis.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameIconToImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Icon",
                table: "Categories",
                newName: "ImageUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Categories",
                newName: "Icon");
        }
    }
}
