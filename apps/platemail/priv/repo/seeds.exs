# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#

widgets = [
  %{title: "Title", content: "Content"}
]

Enum.each(0..100, fn _ ->
  Platemail.Core.create_widget(%{
    title: Faker.Internet.domain_word(),
    content: Faker.Lorem.Shakespeare.king_richard_iii()
  })
end)
