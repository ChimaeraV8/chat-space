FactoryBot.define do
  
  factory :message do
    text {Faker::Lorem.sentence}
    photo {File.open("#{Rails.root}/public/images/sample.jpg")}
    user
    group
  end
end