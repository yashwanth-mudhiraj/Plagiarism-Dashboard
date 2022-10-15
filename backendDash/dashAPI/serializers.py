from dataclasses import fields
from rest_framework import serializers
from dashAPI.models import courseRegistration, professorDetails, studentDetails, assignments

class CourseRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = courseRegistration
        fields = ('courseId',
                  'courseName',
                  'professorId',
                  'professorName',
                  'courseCreateDate',
                  )

class profDetSerializer(serializers.ModelSerializer):
    class Meta:
        model = professorDetails
        fields = ('proId',
                  'proFName',
                  'proLName',
                  'dept',
                  'yearJoin',
                  'email',
                  'simThreshold')

class stuDetSerializer(serializers.ModelSerializer):
    class Meta:
        model = studentDetails
        fields =( 
            'index',
            'stuId',
            'stuFName',
            'stuLName',
            'courseId',
            'yearJoin',
            'email')

class assgnSerializer(serializers.ModelSerializer):
    class Meta:
        model = assignments
        fields = (
            'assgnId',
            'assgnName',
            'assgnCreated',
            'assgnDeadline',
            'proId',
            'courseId',
            'DocFileName',
            'avgSim',
            'year'
        )

