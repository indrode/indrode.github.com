---
layout: post
title: "A quick Rails 3 development and deployment stack setup"
summary: "Setting up the local environment for rapid Rails 3 application development including RSpec/Cucumber, git, and Capistrano."
categories: 
- rails
- ruby
- terminal
- capistrano
- git
- cucumber
- rspec
- mysql
- gems
- passenger
- nginx
- bash
- mac
- linux
---

## A quick Rails 3 development and deployment stack setup

This page includes all the little steps to set up the development and deployment of a Rails application in a Mac development and Debian/Ubuntu production environment respectively.

There are three essential tools I use when developing locally on my Mac: a browser (usually Firefox, because of some nice add-ons), Terminal, and Textmate. This is all you need at first. Add Photoshop or your graphics editing software of choice for all the graphical elements/image processing.

Quick and dirty, here are the plugins, gems, and applications I usually use to develop a Rails 3 application from scratch. **MySQL** (MySQL 2 gem in Rails 3) is my database of choice for development *and* production (although MongoDB via Mongoid looks very promising). Additionally, I have *cloned* my production environment by installing **Phusion Passenger** and **nginx** on my local Mac box. Take a look at [this screencast about the Passenger/nginx installation](http://www.modrails.com/videos/passenger_nginx.mov) to get something similar running on your machine. I am also using the more memory-efficient **Ruby Enterprise Edition** (compatible with Ruby 1.8.7 as of today).

Production-wise, as mentioned before, I am running MySQL/Passenger/nginx/Ruby Enterprise Edition on an Ubuntu box. The source code is maintained within a git repository and deployed to my web server via Capistrano.

### Setting up a development environment locally

#### 1. Create development and test databases

This little tutorial requires that you have MySQL installed and have created two empty databases (development and testing). Database tables will be created via Rails migrations later on. Make sure to start up your MySQL before you launch your web server.

#### 2. Create new Rails application

Power up a Terminal instance and start creating a new Rails application.

{% highlight bash %}
rails new Myapp -JT
cd myapp
{% endhighlight %}

The options `-JT` skip the generated files for `Test::Unit`. We'll use a RSpec/Cucumber setup instead. Also, I prefer **jQuery** over **Prototype**, so let's skip the Rails-generated Prototype scripts altogether for now.

#### 3. Add some gems to Gemfile

To enable MySQL (instead of SQLite3; although this is just a matter of personal preference), and to add some other gems which will be used, open up `Gemfile` in Textmate (`mate Gemfile`) or your editor of choice and add the following lines:

{% highlight ruby %}
gem 'rake'
gem 'nifty-generators'
gem 'mysql2'
gem 'capistrano'
{% endhighlight %}

Now on to the testing and development parts. Still in `Gemfile` add the following block. This will mainly include the required gems for **Cucumber** and **RSpec**.

{% highlight ruby %}
group :cucumber, :development, :test do
  gem 'capybara'
  gem 'gherkin'
  gem 'database_cleaner'
  gem 'cucumber-rails'
  gem 'cucumber', '0.7.3'
  gem 'rspec-rails', '>= 2.0.0.beta.10'
  gem 'spork'
  gem 'factory_girl'
  gem 'factory_girl_rails'
  gem 'launchy'
end
{% endhighlight %}

To be able to use the RSpec generator, we add the following lines to `config/application.rb`.

{% highlight ruby %}
config.generators do |g|
  g.test_framework :rspec
end
{% endhighlight %}

Now, let's install all of these gems using **Bundler**.

{% highlight bash %}
sudo bundle install
{% endhighlight %}

If there are ever any strange problems, a simple `sudo bundle install` or `sudo bundle upgrade` may be the quick solution.

#### 4. Setting up RSpec and Cucumber

Now that we have all the required gems installed, we need to setup the skeleton files for RSpec and Cucumber. Run the following in your shell. This includes a quick rake to check if RSpec and Cucumber are running.
{% highlight bash %}
rails g rspec:install
rails g cucumber:install --capybara --rspec
rake spec
rake cucumber
{% endhighlight %}

#### 5. Using nifty generators

For some simple rapid application development, I like to use Ryan Bates' nifty generators. Using these generators, you can easily add a nice layout, some simple authorization functionality, and some better looking scaffolding to your rails application.

{% highlight bash %}
rails g nifty:layout
rails g nifty:authentication
rails g nifty:scaffold Banana name:string country:string date_sent:date description:text taste:string --rspec
{% endhighlight %}

#### 6. Last little things

We are almost done and ready to write some code. First we need to run the migrations generated by nifty:authentication and nifty:scaffold. For the example above, this should create a `User` and a `Banana` table.

{% highlight bash %}
rake db:migrate
{% endhighlight %}

Additionally, remove the generic index.html from the `/public` folder.
{% highlight bash %}
rm public/index.html
{% endhighlight %}

Because we removed `index.html`, we need to set the route to the new homepage. Open up `config/routes.rb` and add the following line:

{% highlight ruby %}
root :to => "sessions#new"
{% endhighlight %}

The example above sets the root of your application to the login screen. Now, it would be a good idea to start writing some Cucumber scenarios specifying the required behavior of your app, and start fixing the generated code to act accordingly. However, you may first want to set up your web server and start up your Rails application in your browser to see if everything is working correctly.

### Setting up your local web server with Passenger/nginx

These are some sample settings for a local Passenger/ngix Rails instance. Open up the `nginx.conf` file.

{% highlight bash %}
sudo mate /opt/nginx/conf/nginx.conf
{% endhighlight %}

Now add the following block, or edit an existing one:

{% highlight ruby %}
server {
	listen 8080;
	server_name localhost;
	# Myapp development	
	root /Users/myusername/Sites/myapp/public;
	passenger_enabled on;
	rails_env development;
}
{% endhighlight %}

For this to work, make sure you have `passenger_root` and `passenger_ruby` set to the correct path, like you were told during your Passenger setup. Also make sure that you are pointing to the `/public` folder of your application. After these changes, start up the nginx server.

{% highlight bash %}
sudo /opt/nginx/sbin/nginx start
{% endhighlight %}

Now, you can browse to `http://localhost:8080` and you should see the login screen of your application. You are now ready to test and develop your app. Whenever you need to restart your Rails application (for example after database migrations), a simple `touch tmp/restart.txt` will do the trick.

### Deploying with git and Capistrano

Before your application become larger, you should add some type of version control system. In the Rails world, **git** appears to be the VCS of choice and it plays along nicely with Capistrano. I will not get into details about setting up git on your computer (check tutorials [such as this one](http://help.github.com/git-installation-redirect)).

### To-Do: git/github, Capistrano, and deployment










