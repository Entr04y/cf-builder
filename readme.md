# CloudFormation Template Development Workflow

This repository consists of a template for developing Cloudformation templates in a sane manner.  Base.yaml or Base.json define the structure of the template with placeholders for each required section of the cloudformation template.  Within the partials directory there is a subdirectory for each section, and within that subdirectory is where the objects are defined.  Objects are defined one (or whatever grouping you prefer) per file, allowing each file to be focused on one object or a small collection of related objects.  See the partials-example directory for an example that asks for a key pair and cidr block to allow ssh from, creates a vpc, ec2 instance, and security group, then outputs the instances public ip and dns name.

Using the included gulpfile.js, gulp will merge either the json or yaml files into a single template and outputs it to the dist subdirectory.  

## Requirements

You will need to have node.js and gulp installed on your development machine. 
Once they are installed, you will need to clone this repository to your local machine.

## Known issues

The shorthand version of functions for YAML doesn't work with the gulp merge module.  It interprets the shorthand as a tag (which it is) but it has no knowledge of the cloudformation tags and sees them as undefined.

Placing a reference on the same line as a parameter also causes an error with the merge module in YAML, so if you do this:

```
...
   VpcId: Ref: myVPC
...
```

you will get an error during the merge.  Make your references like so:

```
...
  VpcId:
    Ref: myVPC
...
```

## Setting up your project
Change to the newly cloned directory and from the top level install gulp, gulp-merge-json and gulp-yaml-merge modules to the local directory via npm.

This can be accomplished by running the following in the base directory:

```
npm install gulp gulp-merge-json gulp-yaml-merge --save-dev
```

You are now ready to build the example template.

### Building the example template

To build the example template, run the command 

```
gulp
```

in the base directory.  It will output example-template.yaml to the dist directory.

## Creating your own templates

Copy the cloned directory to a new directory for your project.  If you did a regular clone, you will probably need to remove the .git directory and then run git init if you want to keep the project in version control.  Update the first line of gulpfile.js to set the name of the templates that get output in the dist directory.

In the partials directory for the template section you want to edit copy either json.blank or yaml.blank to a descriptive name.  For example, if you want to create a nat instance resource and are using yaml, you might want to name the file natInstance.yaml.  See the partials-example directories for some examples.

After you have completed all of the partials you need, you are ready to build the template.

### Building your template

Once you have your partials complete, you can build your template by running either

```
gulp json
```

or 

```
gulp yaml
```

in the top-level directory, depending on the format you prefer to write your templates in.  When that completes, you should have a fully baked cloudformation template in the dist directory that you can upload to s3, use with the awscli, or paste into the cloudformation console to create your stack.

### Validate your template

The gulp merge libraries will usually throw an error if there are syntax problems with your partial files.  However, they can't detect certain cloudformation specific issues with respect to syntax and dependency checking.  Use the awscli tool to validate your template before creating your stack.  

```
aws cloudformation validate-template --template-body file://dist/example-template.yaml
```

If you are using the web interface to launch your stack, it will also perform validation on the template when you upload it. 