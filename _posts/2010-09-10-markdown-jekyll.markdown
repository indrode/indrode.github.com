---
layout: post
title: "A short Markdown, Liquid, Pygments, and Jekyll reference"
summary: "Sample markdown and code highlighting techniques and setting up github pages to use with Jekyll, as well as a sample github/Jekyll deployment workflow."
categories: 
- jekyll
- ruby
- markdown
- liquid
- pygments
- git
- bash
---

## A short Markdown, Liquid, Pygments, and Jekyll reference

This is a sample Bandito page highlighting some Markdown techniques, primarily regarding syntax highlighting in my Jekyll-built Markdown/Pygments environment. To add some value to this reference, this document is [available in raw text](http://github.com/indrode/indrode.github.com/raw/master/_posts/2010-09-10-markdown-jekyll.markdown), which will make it easier to figure out how certain Markdown syntax is used to get the desired output. As a more thorough reference, check out John Gruber's official [Markdown Syntax Documentation](http://daringfireball.net/projects/markdown/syntax).

### Displaying code excerpts

Of course there are the very basics, like the pound signs `#` which stand for HTML heading tags, e.g. `### Displaying code excerpts` will display this paragraph's heading (h3). Two asterisks will **make things bold** for you. Just one asterisks *makes it look like this*. Now to the good stuff. To add language-specific syntax highlighting like the one below, check the raw text file of this document.

{% highlight ruby %}
def destroy
  # delete a user
  current_user.destroy!  
  flash[:notice] = t("user.deleted")
  redirect_to home_path
end
{% endhighlight %}

What you've just seen was some syntax-highlighted Ruby code. For this particular Jekyll implementation, I have added language styles for `ruby`, `css`, `bash` and `sql`.

### GitHub Pages and Jekyll workflow

As you can read on `http://pages.github.com/`, the GitHub Pages feature allows you to publish content to the web by simply pushing content to one of your GitHub hosted repositories.

The first step is to add a GitHub Pages repository, which will be used to serve the Jekyll site. Create the new repository via the link on `https://github.com/` (log in first), then fire up Terminal and follow the instructions to set up git for your project. Make sure you have your SSH public keys set up. You may also have to set some global settings, if this is your first git repository. Here are mine:

{% highlight bash %}
git config --global user.name "Indro De"
git config --global user.email indro.de@gmail.com
{% endhighlight %}

This adds your development environment, an empty `readme` (I like to use `README.rdoc` so I can use some simple markup), and tells git where to push your files to. That's already all there is to do.

{% highlight bash %}
mkdir indrode.github.com
cd indrode.github.com
git init
touch README
git add README
git commit -m 'first commit'
git remote add origin git@github.com:indrode/indrode.github.com.git
git push origin master
{% endhighlight %}

Once everything is set up on your development machine, the actual development can commence. It couldn't be much easier to build a Jekyll website locally into the project's `_site` folder.

{% highlight bash %}
cd sites/indrode.github.com
jekyll
{% endhighlight %}

In production, GitHub will actually run `jekyll --pygments --safe`, but the steps above work for me. Checking out to GitHub is simple, as seen below. The GitHub Pages engine does the rest to serve the Jekyll website to `ìndrode.github.com`. However, you should add a simple `.gitignore` file containing a single line `_site` to the root of your project, to tell git to ignore the folder with your locally built website.

{% highlight bash %}
git status
git add .
git commit -m 'change description'
git push origin master
{% endhighlight %}

This is all that is needed to have GitHub serve your Jekyll implementation. This space may be updated in future to add some more worthwhile Jekyll / GitHub goodness.