(function(){
	"use strict";
	document.addEventListener("DOMContentLoaded", function(e) {
		var screens = document.getElementsByClassName("screen");
		var currentStep = 0;
		var answers = [];
		var result = '';
		var currentOption = '';
		var mQuestion = false;
		var mScrollpos = 0;

		var changeStep = function(step) {
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			var stepId = "step-" + step;
			document.getElementById(stepId).className += " visible";
			document.body.className = 'step ' + stepId;
			goHeader();
			currentStep = step;
		};
		var goHeader = function() {
			window.scrollTo(0, 0);
		};
		var calculateResult = function() {
			var resultVariant = '';
			var answersString = '';
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			var numberAnswers = {};
			for(var i = 0; i < answers.length; i++) {
				numberAnswers[answers[i]] = (numberAnswers[answers[i]] || 0) + 1;
				answersString += answers[i];
			}
			console.log(answersString);
			var answersByFrequency = [];
			for(var variant in numberAnswers) {
				answersByFrequency.push([variant, numberAnswers[variant]]);
			}
			answersByFrequency.sort(function(a, b) {return b[1] - a[1]});
			if(answersByFrequency[0][1] > 2 || answersByFrequency[0][1] == 2 && answersByFrequency[1][1] < 2) {
				resultVariant = answersByFrequency[0][0];
			}
			else {
				resultVariant = 'M';
			}
			result = resultVariant;
		};

		var showResult = function() {
			if(result.length > 0) {
				window.scrollTo(0, 0);
				location = 'b-test-result-' + result + '.html';
			}
		};

		var processStep = function() {
			answers.push(currentOption);
			currentOption = "";
			console.log(answers);
			if(currentStep < 10) {
				var nextStep = currentStep + 1;
				changeStep(nextStep);
			}
			else {
				calculateResult();
				showResult();
			}
		};

		var minifyQuestion = function(){
			var qEl = document.querySelector('.screen.visible .quest-head');
			var questElementHolder = document.querySelector('.screen.visible .quest-head-holder');
			var aHolder = document.querySelector('.screen.visible .variants-holder');
			var headerH = document.getElementById('main-title-holder');
			var qElSize = {};
			if(qEl){
				if(!mQuestion && qEl.getBoundingClientRect().bottom < headerH.getBoundingClientRect().height){
					mQuestion = true;
					mScrollpos = window.scrollY;
					if(questElementHolder.className.indexOf("min") == -1){
						qElSize = questElementHolder.getBoundingClientRect();
						aHolder.style.marginTop = (window.scrollY + qElSize.top + qElSize.height) + 'px';
						document.querySelector('.screen.visible .quest-head-holder').className += " min";
					}
				}
				if(mQuestion && window.scrollY < mScrollpos - 32){
					mQuestion = false;
					mScrollpos = 0;
					aHolder.style.marginTop = 0;
					questElementHolder.className = questElementHolder.className.replace(" min", "");
				}
			}
		};

		if(document.getElementById("start-btn")){
			document.getElementById("start-btn").addEventListener("click", function(){
				changeStep(1);
			}, false);
		}
		if(document.getElementById("start-btn-top")){
			document.getElementById("start-btn-top").addEventListener("click", function(){
				changeStep(1);
			}, false);
		}

		var stepOptions = document.getElementsByClassName("step-option");
		for (var i = 0; i < stepOptions.length; i++) {
			stepOptions[i].addEventListener("click", function(){
				currentOption = this.getAttribute("data-option");
				var options = document.querySelector('.screen.visible .option-holder.active');
				if(options){
					options.className = options.className.replace(" active", "");
				}
				this.parentNode.className += ' active';
				if(document.querySelector('.screen.visible .submit').className.indexOf("active") == -1){
					document.querySelector('.screen.visible .submit').className += " active";
				}
			}, false);
		}
		
		var submits = document.getElementsByClassName('submit');
		for (var i = 0; i < submits.length; i++) {
			submits[i].addEventListener("click", function(){
				processStep();
			});
		}

		window.addEventListener('scroll', function(e){
			setTimeout(minifyQuestion, 20);
		});


		if(document.getElementById("container").className.indexOf("result") == -1 && document.body.className.indexOf("result") == -1){
			changeStep(0);
		}
		document.querySelector('.sn-fb').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.origin + location.pathname));
		document.querySelector('.sn-tw').setAttribute('href', 'https://twitter.com/share?url=' + encodeURIComponent(location.origin + location.pathname));
	});

	window.onbeforeunload = function(){
		window.scrollTo(0,0);
	}
})(window, document);
