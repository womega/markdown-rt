## UML charts using mermaid

### Flowchart

```uml
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
```

[Flowchart Syntax](https://github.com/mermaid-js/mermaid)

``` warning
Adding many flowcharts will slow down the editor.
```

### Sequence diagram

```uml
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

[Sequence Diagram Syntax](https://github.com/mermaid-js/mermaid)

``` warning
Adding many sequence diagrams will slow down the editor.
```

### Gantt diagram

```uml 
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d

section Critical tasks
Completed task in the critical line :crit, done, 2014-01-06,24h
Implement parser and jison          :crit, done, after des1, 2d
Create tests for parser             :crit, active, 3d
Future task in critical line        :crit, 5d
Create tests for renderer           :2d
Add to mermaid                      :1d

section Documentation
Describe gantt syntax               :active, a1, after des1, 3d
Add gantt diagram to demo page      :after a1  , 20h
Add another diagram to demo page    :doc1, after a1  , 48h

section Last section
Describe gantt syntax               :after doc1, 3d
Add gantt diagram to demo page      : 20h
Add another diagram to demo page    : 48h
```

[Gantt Diagram Syntax](https://github.com/mermaid-js/mermaid)

``` warning
Adding many gantt diagrams will slow down the editor.
```

### Class diagram

```uml
classDiagram
Animal <|-- Duck
Animal <|-- Fish
Animal <|-- Zebra
Animal : +int age
Animal : +String gender
Animal: +isMammal()
Animal: +mate()
class Duck{
	+String beakColor
	+swim()
	+quack()
}
class Fish{
	-int sizeInFeet
	-canEat()
}
class Zebra{
	+bool is_wild
	+run()
}
```

Class diagram is powered by [mermaid](https://github.com/mermaid-js/mermaid).

``` warning
Adding many class diagrams will slow down the editor.
```


```uml
stateDiagram
[*] --> Still
Still --> [*]

Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
```

State diagram is powered by [mermaid](https://github.com/mermaid-js/mermaid).

``` warning
Adding many state diagrams will slow down the editor.
```

```uml
pie title Pets adopted by volunteers
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```

Pie is powered by [mermaid](https://github.com/mermaid-js/mermaid).

``` warning
Adding many class diagrams will slow down the editor.
```