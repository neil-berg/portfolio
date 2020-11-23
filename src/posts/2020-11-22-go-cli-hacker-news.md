---
title: "Creating a Simple CLI Tool Using Go"
date: "2020-11-22"
description: Fetch Hacker News posts from the comfort of your command line using Go.
---

## Go Hacker News CLI

<time datetime="2020-11-22">November 22, 2020</time>

[Hacker News](https://news.ycombinator.com/) is a well loved and read site
featuring various tech related posts, job postings, show and tell projects, and
more. They also expose a public, free API to query these artifacts. Using Go's
powerful built-in libraries for parsing command-line flags and making network
requests, this post describes how to create a simple CLI tool for fetching and
displaying Hacker News stories.

The full code [can be found here.](https://github.com/neil-berg/gohn)

### Getting Started

To begin a Go project, a module management file is first created in the project
root with `go mod init <repo-location>`:

```bash
go mod init github.com/neil-berg/gohn
```

This produces a `go.mod` file to store information about
modules used in the project.

Then create a main Go file in the project root. It does not need to be called
`main.go`, though it could be. I like to name it after the project name. Since
the project name I chose was `gohn`, I have a `gohn.go` file next to the newly
created `go.mod` file.

```bash
gohn/
  go.mod
  gohn.go
```

Inside `gohn.go`, we declare that this is the `main` package with a corresponding
`main` function that is executed when the program runs.

```go
package "main"

import "fmt"

func main() {
  fmt.Println("Hello")
}
```

### Parsing Command-Line Flags

Go provides a powerful built-in library [flag](https://golang.org/pkg/flag/) for
parsing command-line inputs.

Gohn is designed to handle two flags, the kind of
stories to fetch (e.g. top stories, job postings, etc.) and the count of items
to fetch. Inside a separate `flags` package (i.e. sub-directory), a new function
is created that handles the logic for reading, validating, and returning command-
line flags.

The `flag` library allows for two ways to store parsed inputs. You can store them
in a pointer of the flag's type or you can bind it to a variable. For instance:

```go
// flags.go
import "flag"

func ParseFlags() {
    // "--count" input is stored as a pointer to an integer
    countPtr := flag.Int("count", 5, "Number of stories to fetch between 1 and 10")

    // OR bind the input to a variable that is an integer
    var countVar int
    flag.IntVar(&countVar, "count", 5, "Number of stories to fetch between 1 and 10")
}
```

### HTTP Requests

Making HTTP requests in Go is dead-simple with their [net/http](https://golang.org/pkg/net/http/)
package. To demonstrate, let's fetch a Hacker News item by the item's ID. The
endpoint to do so is `https://hacker-news.firebaseio.com/v0/{itemID}.json`.

Since JSON data is returned from the API, we need to define a `struct` with the
desired fields to store from the parsed JSON data.

```go
// requests.go

package requests

// Story JSON structure from the API call
type Story struct {
	Score       int    `json:"score"`
	Time        int    `json:"time"`
	Title       string `json:"title"`
	URL         string `json:"url"`
}
```

We then create a new HTTP client, make a GET request to the endpoint, read the
response's body, and then decode the JSON data into a pointer variable with type
`Story`.

```go
// requests.go

package requests

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"
)

// Story JSON structure from the API call
type Story struct {
  // As defined above...
}

func GetStoryByID(ID int) Story {
  // New client with a 2 second timeout
  client := http.Client({ Timeout: time.Second() * 2 })

  // GET request
  url := "https://hacker-news.firebaseio.com/v0//item/" + strconv.Itoa(ID) + ".json"
  res, err := client.Get(url)
  if err != nil {
    log.Fatal(err)
  }

  // Close the body at the end of this function
  defer res.Body.Close()

  // Read the body
  body, bodyErr := ioutil.ReadAll(res.Body)
  if bodyErr != nil {
    log.Fatal(bodyErr)
  }

  // Decode JSON data and store it in a story variable
  var story Story
  jsonErr := json.Unmarshal(body, &story)
  if jsonErr != nil {
    log.Fatal(jsonErr)
  }

  return story
}


```

Note that error handling in Go is commonly done by returning the error or `nil`
as a variable from a function, then doing something if the error is not `nil`.

Also note that Go supports `defer` statements, which are executed at the end of
the function containing it. In this case, we close the response body after it is
read and the JSON data is parsed.

### Formatting Data

After fetching stories based on command-line flags, the last step is to format
raw JSON data from the fetched story into something pretty in the terminal.
Go's [fmt.Sprintf](https://golang.org/pkg/fmt/#Sprintf) is used to format strings.
For example, transforming the story's UNIX timestamp into a more readable string:

```go
import "time"

func FormatStoryTime(secs int) {
  t := time.Unix(int64(secs))
  // Month DD, YYYY hh:mm UTC
  tFmt := fmt.Sprintf("%s %02d, %04d %02d:%02d UTC",
		t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}
```

### Putting It All Together

Ultimately we have a directory structure like:

```bash
gohn/
  go.mod
  gohn.go
  flags/ (parse command-line flags)
    flags.go
  requests/ (HTTP requests)
    requests.so
  utils (helper utility functions)
    utils.go
```

In `gohn.go`, the main package, we import the flag parsing function and then
pass the parsed values (as pointers) downstream to functions that perform the
HTTP requests.

We can then build the app with `go run build` in the project root, which will
produce a compiled binary `gohn`. It can be executed in the root with
`./gohn --count=<some-count> --type=<some-story-type>"`.

For instance, to fetch 2 Top News stories:

```bash
./gohn --count=2 --type="top"
```

To reveal:

```bash
#1      Building Your Color Palette
        Score:   197
        Posted:  November 22, 2020 11:19 UTC
        https://refactoringui.com/previews/building-your-color-palette/

#2      On the Loss of a Cofounder
        Score:   97
        Posted:  November 22, 2020 11:43 UTC
        https://ouegner.medium.com/on-the-loss-of-a-cofounder-73e1e8347b00
```
