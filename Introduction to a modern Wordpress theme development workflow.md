## Introduction to a modern Wordpress theme development workflow

[Wordpress](https://www.wordpress.org/about) is an open source content management system (CMS) that runs on PHP and MySQL. If you are more into Node I would highly recommend having a look at [Ghost](https://github.com/TryGhost/Ghost). Please note that I'll be treating you as a developer not a casual user that is only looking to modify a theme. 

## Installing Wordpress

To start you off with Wordpress I would like to introduce you first to the modern Wordpress workflow. Much of the stuff you find online is either outdated or has better alternatives. We will be using a virtual machine (VirtualBox), a development environment focused on Wordpress (VVV) and a site creation tool (VV). This may seem like a ton of work to set up but if you are planning to work with Wordpress on a regular basis I highly recommend the workflow I am going to describe in a bit.  For this tutorial I am going to assume you use OSX and Homebrew.

## VirtualBox + Vagrant + VVV + VV

You first off all want to install [VirtualBox](https://www.virtualbox.org/wiki/Downloads), a virtual machine. If you don't know what a virtual machine is I highly recommend reading up on the subject before proceeding. [Vagrant](https://www.vagrantup.com/) is used to create lightweight and portable development environments. You can clone your server configuration and develop for it locally.

	$ brew cask install virtualbox

	$ brew cask install vagrant

You can now run `vagrant` as a command. Next you should install the plugin `vagrant-hostsupdater` to automate the updating of your hosts file.

	$ vagrant plugin install vagrant-hostsupdater

You should also install `vagrant-triggers` to enable commands like `vagrant halt` and `vagrant destroy`. On halt, suspend and destroy it will back up your Wordpress database.

	$ vagrant plugin install vagrant-triggers

You should now create a local folder install [VVV (Varying Vagrant Vagrants)](https://github.com/Varying-Vagrant-Vagrants/VVV). VVV is an open source Vagrant configuration focused on Wordpress development. This is the environment we will actually be working in.

	$ git clone git://github.com/Varying-Vagrant-Vagrants/VVV.git vagrant-local

Now that we have the enviroment we have to install [Variable VVV](https://github.com/bradp/vv) that we will use to spawn instances of Wordpress.

	$ brew install bradp/vv/vv

	$ cd ~/vagrant-local

	$ vv create

	$ vagrant up

Now just head to `projectname.dev/wp-admin`. You can log in using `admin` and `password`. Make sure to change them before deploying. Make sure to have a look at the documentation of VVV and Variable VVV.


