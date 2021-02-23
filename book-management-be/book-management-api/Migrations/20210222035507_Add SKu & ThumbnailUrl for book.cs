using Microsoft.EntityFrameworkCore.Migrations;

namespace book_management_api.Migrations
{
    public partial class AddSKuThumbnailUrlforbook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SKU",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ThumnailUrl",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SKU",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "ThumnailUrl",
                table: "Books");
        }
    }
}
